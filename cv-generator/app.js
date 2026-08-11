const form = document.querySelector('#resume-form');
const toast = document.querySelector('#toast');

const escapeHtml = (value) => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));

function updatePreview() {
  const data = new FormData(form);
  for (const [key, raw] of data.entries()) {
    const value = raw.trim();
    const output = document.querySelector(`[data-output="${key}"]`);
    const section = document.querySelector(`[data-section="${key}"]`);
    if (!output) continue;
    section?.classList.toggle('sr-only', !value);
    if (key === 'skills') {
      output.innerHTML = value ? value.split(',').filter(Boolean).map(skill => `<span>${escapeHtml(skill.trim())}</span>`).join('') : '';
    } else if (key === 'experience' || key === 'education') {
      output.innerHTML = value ? value.split('\n').filter(Boolean).map(line => `<p>${escapeHtml(line.trim())}</p>`).join('') : '';
    } else output.textContent = value || (key === 'name' ? 'Ваше ім’я' : key === 'role' ? 'Бажана посада' : '');
  }
  localStorage.setItem('resume-form-ua', JSON.stringify(Object.fromEntries(data)));
}

function resumeText() {
  const data = Object.fromEntries(new FormData(form));
  return [data.name, data.role, data.contacts, '', 'ПРОФІЛ', data.summary, '', 'ДОСВІД', data.experience, '', 'ОСВІТА', data.education, '', 'НАВИЧКИ', data.skills].filter(item => item !== undefined).join('\n');
}

form.addEventListener('input', updatePreview);
document.querySelector('#copy-btn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(resumeText()); toast.textContent = 'Резюме скопійовано до буфера обміну.'; }
  catch { toast.textContent = 'Не вдалося скопіювати. Спробуйте ще раз.'; }
  setTimeout(() => toast.textContent = '', 3000);
});
document.querySelector('#export-btn').addEventListener('click', () => window.print());
document.querySelector('#clear-btn').addEventListener('click', () => {
  form.querySelectorAll('input, textarea').forEach(field => field.value = '');
  localStorage.removeItem('resume-form-ua');
  updatePreview();
  toast.textContent = 'Форму очищено.';
  setTimeout(() => toast.textContent = '', 2500);
});
const saved = localStorage.getItem('resume-form-ua');
if (saved) Object.entries(JSON.parse(saved)).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
document.querySelector('#today').textContent = new Intl.DateTimeFormat('uk-UA', { month: 'long', year: 'numeric' }).format(new Date());
updatePreview();
