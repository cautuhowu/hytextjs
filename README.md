# **`Hytext.js`**

**Hytext.js** is a lightweight JavaScript framework for creating HTML through JavaScript.

Inspired by the idea of writing HTML clearly in JavaScript, Hytext.js provides a simple way to create HTML elements, handle DOM events, define CSS, and configure the document `<head>` — all with zero external dependencies.

## **Installation**

You can download or clone the repository to your device to get started.

## **Quick Start**

You can set up your project with the following structure:

    ```js
    import { Hytext } from "./hytext/core/hytext.js";

    const app = new Hytext();

    app.head({
        lang : "en",
        title : "New Hytext Document",
    });

    app.body(el => {});
    ```

## **Recommendation**
For styling, it is recommended to use an external CSS file. Hytext.js's current styling features do not yet support all CSS features available in native CSS.

## **About**

Hytext.js is open source under the MIT License and free to use. Let's make writing HTML with JavaScript simple and enjoyable!

Also, this project is developed by one person. If you find it useful or cool, please consider giving it a star on GitHub!

---

**Hytext.js** là một framework JavaScript nhẹ, dùng để tạo HTML thông qua JavaScript.

Lấy cảm hứng từ ý tưởng viết HTML một cách rõ ràng bằng JavaScript, Hytext.js cung cấp một cách đơn giản để tạo các phần tử HTML, xử lý sự kiện DOM, định nghĩa CSS và cấu hình phần `<head>` của tài liệu — tất cả mà không cần bất kỳ thư viện bên ngoài nào.

## **Cài đặt**

Bạn có thể tải xuống hoặc clone repository về thiết bị của mình để bắt đầu sử dụng.

## **Bắt đầu nhanh**

Bạn có thể thiết lập project của mình với cấu trúc sau:

    ```js
    import { Hytext } from "./hytext/core/hytext.js";

    const app = new Hytext();

    app.head({
        lang: "en",
        title: "New Hytext Document",
    });

    app.body(el => {});
    ```

## **Khuyến nghị**

Đối với việc tạo kiểu, bạn nên sử dụng một file CSS bên ngoài. Các tính năng xử lý CSS hiện tại của Hytext.js chưa hỗ trợ đầy đủ tất cả các tính năng CSS có trong CSS gốc.

## **Giới thiệu**

Hytext.js là mã nguồn mở theo giấy phép MIT và được sử dụng miễn phí. Hãy cùng làm cho việc viết HTML bằng JavaScript trở nên đơn giản và thú vị!

Ngoài ra, project này được phát triển bởi một người. Nếu bạn thấy nó hữu ích hoặc thú vị, hãy cân nhắc tặng project một star trên GitHub!

Copyright (c) 2026 Cautuhowu