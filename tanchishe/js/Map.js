/**
 * @Map:地图类
 * @width: 地图的宽度
 * @height: 地图的高度
 * @row： 行数
 * @col: 列数
*/
function Map(width, height, row, col) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    // 创建地图容器
    this.dom = document.createElement('div');
    // 记录每一个divs
    this.divs = [];

}

// 渲染地图
Map.prototype.renderMap = function() {
    // 创建行div
    for (var i = 0; i < this.row; i++) {
        // 创建一个 数组
        var arr = [];        
        // 创建行div
        var divrow = document.createElement('div');
        // 添加样式
        divrow.style.height = this.height / this.row + 'px';
        // 添加class值，用于样式的设置
        divrow.className = 'row';
        for (var j = 0; j < this.col; j++) {
            // 创建列div
            var divcol = document.createElement('div');
            // 设置宽高
            divcol.style.width = this.width / this.col + 'px';
            divcol.style.height  = this.height / this.row + 'px';
            // 添加class值，用于样式的设置
            divcol.className = 'col';
            // 将列的div放入行的div中
            divrow.appendChild(divcol);
            // 将divcol放入数组中存储
            arr.push(divcol);
        }
        // 将行div放入地图的容器
        this.dom.appendChild(divrow);
        // 将数组arr放入divs中用于记录所有的div
        this.divs.push(arr);
    }
    // 将容器的div放入到body中
    document.body.appendChild(this.dom);
    // 设置样式
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';

    
};

// 清屏
Map.prototype.clear = function() {
    // 都是背景图
    for (var row = 0; row < this.divs.length; row++) {
        for(var col =0; col < this.divs[row].length; col++) {
            this.divs[row][col].style.backgroundImage = 'none';
        }
    }
}
