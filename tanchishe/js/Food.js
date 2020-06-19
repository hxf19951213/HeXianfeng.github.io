/**
 * @Food: 食物类
 * @img:图像
 * @row: 食物的行坐标
 * @col：食物的列坐标
 * 
*/
function Food(img, row, col) {
    this.img = img;
    this.row = row;
    this.col = col;
}

// 改变食物坐标的方法
Food.prototype.change = function(position) {
    this.row = position.row;
    this.col = position.col;
}
