实现卡片动画，通过 IIFE方式 安装使用。

```html
<script src="node_modules/win-card/dist/win-card-ani.iife.js"></script>
<card-group>
  <my-card title="卡片1" img="a.png" active-img="a_active.png"></my-card>
  <my-card title="卡片2" img="b.png" active-img="b_active.png"></my-card>
</card-group>
<!-- IE11 -->
<div data-card-group>
    <div data-card>
        <div class="cardWrap">
            <img data-img="a.png" data-active-img="a_active.png" src="a.png" />
            <div class="sub">卡片1</div>
        </div>
        <div class="title">卡片1</div>
    </div>
    <div data-card>
        <div class="cardWrap">
            <img data-img="b.png" data-active-img="b_active.png" src="b.png" />
            <div class="sub">卡片2</div>
        </div>
        <div class="title">卡片2</div>
    </div>
</div>
```