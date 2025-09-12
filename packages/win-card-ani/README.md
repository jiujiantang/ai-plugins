实现卡片动画，通过 IIFE方式 安装使用。

```html
<script src="node_modules/win-card/dist/win-card-ani.iife.js"></script>
<card-group>
    <my-card
            title="可可西里设计"
            img="./assets/images/userOne.webp"
            active-img="./assets/images/userOneAct.webp"
            imgWidth="57"
            imgHeight="32"
            actImgWidth="139"
            actImgHeight="77"
    >
    </my-card>
    <my-card
            title="极速出图"
            img="./assets/images/userTwo.webp"
            active-img="./assets/images/userTwoAct.webp"
            imgWidth="63"
            imgHeight="28"
            actImgWidth="138"
            actImgHeight="61"
    >
    </my-card>
    <my-card
            title="雨泽客视觉表现"
            img="./assets/images/userThree.webp"
            active-img="./assets/images/userThreeAct.webp"
            imgWidth="79"
            imgHeight="31"
            actImgWidth="155"
            actImgHeight="61"
    >
    </my-card>
    <my-card
            title="巧匠饰家"
            img="./assets/images/userFour.webp"
            active-img="./assets/images/userFourAct.webp"
            imgWidth="76"
            imgHeight="31"
            actImgWidth="149"
            actImgHeight="61"
    >
    </my-card>
</card-group>
<!-- IE11 -->
<div data-card-group>
    <div data-card>
        <div class="cardWrap">
            <img
                    src="./assets/images/userOne.webp"
                    alt=""
                    data-active-img="./assets/images/userOneAct.webp"
                    data-img="./assets/images/userOne.webp"
                    data-imgWidth="57"
                    data-imgHeight="32"
                    data-actImgWidth="139"
                    data-actImgHeight="77"
            >
            <div class="sub">可可西里设计</div>
        </div>
        <div class="title">可可西里设计</div>
    </div>
    <div data-card>
        <div class="cardWrap">
            <img
                    src="./assets/images/userOne.webp"
                    alt=""
                    data-active-img="./assets/images/userTwoAct.webp"
                    data-img="./assets/images/userTwo.webp"
                    data-imgWidth="63"
                    data-imgHeight="28"
                    data-actImgWidth="138"
                    data-actImgHeight="61"
            >
            <div class="sub">极速出图</div>
        </div>
        <div class="title">极速出图</div>
    </div>
    <div data-card>
        <div class="cardWrap">
            <img
                    src="./assets/images/userOne.webp"
                    alt=""
                    data-active-img="./assets/images/userThreeAct.webp"
                    data-img="./assets/images/userThree.webp"
                    data-imgWidth="79"
                    data-imgHeight="31"
                    data-actImgWidth="155"
                    data-actImgHeight="61"
            >
            <div class="sub">雨泽客视觉表现</div>
        </div>
        <div class="title">雨泽客视觉表现</div>
    </div>
    <div data-card>
        <div class="cardWrap">
            <img
                    src="./assets/images/userOne.webp"
                    alt=""
                    data-active-img="./assets/images/userFourAct.webp"
                    data-img="./assets/images/userFour.webp"
                    data-imgWidth="76"
                    data-imgHeight="31"
                    data-actImgWidth="149"
                    data-actImgHeight="61"
            >
            <div class="sub">巧匠饰家</div>
        </div>
        <div class="title">巧匠饰家</div>
    </div>
</div>
```