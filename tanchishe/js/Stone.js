/**
 * @stone:石头类---障碍物
 * @img: 图像
 * */

function Stone(img) {
    // 障碍物图像
    this.img = img;
    // 障碍物坐标
    this.position = [
        {row:5, col:3},
        {row:5, col:4},
        {row:5, col:5},
        {row:5, col:6},
    ];
}