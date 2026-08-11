# AI Workshop Sites

Один статичний GitHub Pages-сайт із головною сторінкою та п’ятьма автономними HTML-проєктами.

## Структура

- `/` — головна сторінка-хаб;
- `/slides/` — HTML-презентація воркшопу;
- `/cv-generator/` — генератор резюме;
- `/quiz/` — інтерактивний AI-квіз;
- `/pomodoro/` — Pomodoro й програма воркшопу;
- `/project-page/` — демонстраційна сторінка «Майже готово».

Усі посилання та ресурси відносні, тому комплект працює як локально, так і в GitHub Pages project site.

## Рекомендована назва репозиторію

`ai-workshop-sites`

Після публікації адреса матиме вигляд:

```text
https://ВАШЕ-ІМʼЯ.github.io/ai-workshop-sites/
```

## Публікація через GitHub Desktop

1. Відкрийте GitHub Desktop.
2. Оберіть `File` → `Add Local Repository`.
3. Вкажіть цю папку. Якщо застосунок запропонує створити репозиторій, натисніть відповідне посилання.
4. Назва: `ai-workshop-sites`; локальний шлях має закінчуватися саме цією вже створеною папкою.
5. Створіть перший commit із усіма файлами.
6. Натисніть `Publish repository`.
7. Зніміть прапорець `Keep this code private`, щоб репозиторій був публічним.
8. Відкрийте репозиторій на GitHub: `Settings` → `Pages`.
9. У секції `Build and deployment` виберіть `Deploy from a branch`.
10. Виберіть `main`, папку `/(root)` і натисніть `Save`.
11. Після публікації скористайтеся кнопкою `Visit site` на сторінці Pages.

## Публікація через Terminal

Створіть на GitHub порожній публічний репозиторій `ai-workshop-sites` без автоматичного README, а потім виконайте команди з цієї папки:

```bash
git init
git add .
git commit -m "Create AI workshop sites hub"
git branch -M main
git remote add origin https://github.com/ВАШЕ-ІМʼЯ/ai-workshop-sites.git
git push -u origin main
```

Потім увімкніть Pages через `Settings` → `Pages` → `Deploy from a branch` → `main` → `/(root)`.

## Наступні оновлення

Після зміни файлів зробіть новий commit і push. GitHub Pages автоматично опублікує зміни з гілки `main`. Оновлення може з’явитися не миттєво.

Не перейменовуйте папки без одночасного оновлення посилань на головній сторінці.
