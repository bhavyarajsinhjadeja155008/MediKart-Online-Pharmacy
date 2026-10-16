# MediKart – Online Pharmacy

**Web Technology (01CE1306) Project** – Department of Computer Engineering, Marwadi University  
**Student:** Bhavyarajsinh Jadeja (92610120104)

MediKart is a responsive online pharmacy website. Customers can browse medicines, view details, register or log in, and contact the store. The admin panel is used to manage medicines, orders, customers, prescriptions, reports and settings.

## Technologies
- HTML5
- CSS3: variables, flexbox, grid, transitions, animations, media queries
- Bootstrap 5.3.3, loaded from a CDN
- JavaScript form validation (`js/validation.js`)

## How to run
Open `Client/index.html` in any browser; no server is needed. The admin panel opens from **Admin Panel** in the footer or from `Admin/dashboard.html`.

## Folder structure
```
Client/   index.html, medicines.html, medicine-details.html, account.html, contact.html
Admin/    dashboard.html, manage-medicines.html, manage-orders.html, prescriptions.html, reports.html
css/      style.css (common + client), admin.css (admin panel)
js/       validation.js (login, register and contact form validation)
images/   SVG images
1. Project_Wireframe.pdf      wireframes of all 10 pages
2.Project_client side.pdf     client-side screenshots
3.Project_admin_side.pdf      admin-side screenshots
4. JS Validations.pdf         JavaScript validation screenshots
5. github.txt                 link to this repository
```

## JavaScript validations
| Logic | Where |
|---|---|
| All fields are required | Login, Register, Contact |
| Password length (minimum 8) | Login, Register |
| Email pattern | Login, Register, Contact |
| Password pattern (upper, lower, number, special character) | Register |
| Phone number pattern (10 digits starting with 6–9) | Register, Contact |
| Confirm password, pincode (6 digits), terms checkbox | Register |
