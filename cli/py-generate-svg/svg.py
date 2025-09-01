from PIL import Image
import numpy as np
import cv2
from xml.dom.minidom import Document

# 👉 替换为你的图片路径、svg路径、前景（取前景色路径，黑色：THRESH_BINARY_INV； 白色：THRESH_BINARY）
image_path = "./image/material.png"
svg_path = "./dist/material.svg"
foreground = cv2.THRESH_BINARY

# 加载图像并转换为灰度
img = Image.open(image_path).convert("L")
img_np = np.array(img)

# 二值化（反色，让黑色/白色部分为前景）
_, binary = cv2.threshold(img_np, 128, 255, foreground)

# 轮廓提取
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# 获取图像尺寸
height, width = img_np.shape

# 轮廓转 SVG path
def contour_to_path(contour):
    return "M " + " L ".join(f"{pt[0][0]},{pt[0][1]}" for pt in contour) + " Z"

# 构建 SVG
doc = Document()
svg = doc.createElement("svg")
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
svg.setAttribute("viewBox", f"0 0 {width} {height}")
svg.setAttribute("width", str(width))
svg.setAttribute("height", str(height))
doc.appendChild(svg)

# 添加黑色 path
for contour in contours:
    path = doc.createElement("path")
    path.setAttribute("d", contour_to_path(contour))
    path.setAttribute("fill", "black")
    svg.appendChild(path)

# 输出文件
with open(svg_path, "w") as f:
    f.write(doc.toprettyxml(indent="  "))

print("✅ SVG 文件已保存为 material.svg")

