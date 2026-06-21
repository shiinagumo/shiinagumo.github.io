// 获取所有相册图片
const images = document.querySelectorAll(".gallery-item img");

// 获取预览层
const lightbox = document.getElementById("lightbox");
const previewImage = document.getElementById("previewImage");
const closeBtn = document.querySelector(".close");

// 点击图片放大
images.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        previewImage.src = img.src;
    });

});

// 点击关闭按钮
if(closeBtn){

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";
    });
}

// 点击背景关闭
if(lightbox){

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            lightbox.style.display="none";
        }
    });
}
const langBtn = document.getElementById("langBtn");

if(langBtn){

    let currentLang =
        localStorage.getItem("lang") || "zh";

    switchLanguage(currentLang);

    langBtn.addEventListener("click",()=>{

        currentLang =
            currentLang === "zh"
            ? "ja"
            : "zh";

        localStorage.setItem(
            "lang",
            currentLang
        );

        switchLanguage(currentLang);

    });

    function switchLanguage(lang){

        document
        .querySelectorAll("[data-zh]")
        .forEach(el=>{

            el.textContent =
                lang === "zh"
                ? el.dataset.zh
                : el.dataset.ja;

        });

        langBtn.textContent =
            lang === "zh"
            ? "日本語"
            : "中文";
    }
}