/**
 * @游戏类
 * @stone:石头对象
 * @map：地图对象
 * @snake：蛇的对象
 * @food:食物对象
 */
function Game(stone, snake, map, food) {
    // 接收各个对象
    this.stone = stone;
    this.snake = snake;
    this.map = map;
    this.food = food;
    // 设置定时器的标识
    this.timer = null;

    // 设置游戏接口
    this.init();
}

// 渲染食物
Game.prototype.renderFood = function() {
    // 找到对应的div，设置背景图片
    var div = this.map.divs[this.food.row][this.food.col];
    // console.log(div);
    // 设置背景图片
    div.style.backgroundImage = 'url(' + this.food.img + ')';
    div.style.backgroundSize = 'cover';
}

// 渲染障碍物
Game.prototype.renderStone = function() {
    // 由于有多个，所以需要遍历
    for (var i = 0; i < this.stone.position.length; i++) {
        // 找到对应的div，设置背景图片
        var div = this.map.divs[this.stone.position[i].row][this.stone.position[i].col];
        // console.log(div);
        // 设置背景图片
        div.style.backgroundImage = 'url(' + this.stone.img + ')';
        div.style.backgroundSize = 'cover';
    }
    
}

// 渲染蛇
Game.prototype.renderSnake = function() {
    // 渲染蛇的尾部
    // 找到对应的div，设置背景图片
    var div = this.map.divs[this.snake.position[0].row][this.snake.position[0].col];
    // 设置背景图片
    div.style.backgroundImage = 'url(' + this.snake.tail[this.snake.tail_idx] + ')';
    div.style.backgroundSize = 'cover';

    // 渲染蛇的身体
    for (var i = 1; i < this.snake.position.length - 1; i++) {
        // 找到对应的div，设置背景图片
        var div = this.map.divs[this.snake.position[i].row][this.snake.position[i].col];
        // 设置背景图片
        div.style.backgroundImage = 'url(' + this.snake.body + ')';
        div.style.backgroundSize = 'cover';
    }

    // 渲染蛇的头部
    // 找到对应的div，设置背景图片
    var div = this.map.divs[this.snake.position[this.snake.position.length - 1].row][this.snake.position[this.snake.position.length - 1].col];
    // 设置背景图片
    div.style.backgroundImage = 'url(' + this.snake.head[this.snake.head_idx] + ')';
    div.style.backgroundSize = 'cover';
}

// 绑定一个事件
Game.prototype.bindEvent = function() {
    // 备份this
    var me = this;
    // 给document绑定键盘按下事件
    document.onkeydown = function(e) {
        // console.log(e.keyCode);
        // 确定按键的合法性
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            // 调用蛇头的转向
            me.snake.change(e.keyCode);
            
        }
    } 
}

// 游戏接口
Game.prototype.init = function() {
    // 渲染地图
    this.map.renderMap();
    // 渲染食物
    this.renderFood();
    // 渲染障碍物
    this.renderStone();
    // 渲染蛇
    this.renderSnake();
    // 绑定事件
    this.bindEvent();
    // 开始游戏
    this.start();

}

// 游戏的开始
Game.prototype.start = function() {

    // 备份this
    var me = this;
    me.map.clear();
    // 渲染食物
    me.renderFood();
    // 渲染障碍物
    me.renderStone();
    // 渲染蛇
    me.renderSnake();
    var btn=document.getElementById('kaishi');
    btn.onclick=function(){
        console.log(me.snake)
        me.timer = setInterval(function() {
            // 蛇移动---改变坐标
            me.snake.move();
            // 检测碰撞
            if (me.check()) {
                me.gameOver();
                return;
            }
            // 检测是否吃到食物
            if (me.checkFood()) {
                // 长身体
                // console.log('长身体');
                me.snake.growUp();
                // 获得随机食物的坐标
                var position = me.changeFood();
                console.log(position);
                // 改变食物的坐标
                me.food.change(position);
            }
            // 清屏
            me.map.clear();
            // 渲染食物
            me.renderFood();
            // 渲染障碍物
            me.renderStone();
            // 渲染蛇
            me.renderSnake();

        }, 200);
        
    }
    // window.onload=function(){
        // 定时器
        

    // };
    
};

// 游戏结束
Game.prototype.gameOver = function() {
    // 清除定时器
    clearInterval(this.timer);
    // 变成游戏结束的图片
    // this.map.dom.innerHTML = '<img src="img/gameover.jpg">'; 
    window.alert("游戏结束");
    this.snake.tail_idx = 0;
    this.snake.position = [
        {row:3, col: 1}, 
        {row:3, col: 2},
        {row:3, col: 3},
    ];
    this.snake.direction = 39;
    this.snake.lock = false;
    this.map.clear();
    // 渲染食物
    this.renderFood();
    // 渲染障碍物
    this.renderStone();
    // 渲染蛇
    this.renderSnake();
}

// 游戏检测
Game.prototype.check = function() {
    // 检测是否超出边界,检测碰到障碍物
    return this.checkOut() || this.checkStone() || this.checkSnake();
}

// 检测是否超出边界
Game.prototype.checkOut = function() {
    // 获得蛇头的坐标
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    // 判断蛇头坐标是否出界
    if (row < 0 || row == this.map.row || col < 0 || col == this.map.col) {
        // 出界
        return true;
    }
}

// 检测是否撞到石头
Game.prototype.checkStone = function() {
    // 获得蛇头的坐标
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    // 判断石头的坐标和石头的坐标是否重叠
    for (var i = 0; i < this.stone.position.length; i++) {
        if (row == this.stone.position[i].row && col == this.stone.position[i].col) {
            return true;
        }
    }
    
}

// 检测是否碰到自己
Game.prototype.checkSnake = function() {
    // 获得蛇头的坐标
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    // 判断石头的坐标和石头的坐标是否重叠
    for (var i = 0; i < this.snake.position.length - 1; i++) {
        if (row == this.snake.position[i].row && col == this.snake.position[i].col) {
            return true;
        }
    }
    
}

// 检测是否吃到食物
Game.prototype.checkFood = function() {
    // 获得蛇头的坐标
    var row = this.snake.position[this.snake.position.length - 1].row;
    var col = this.snake.position[this.snake.position.length - 1].col;
    // 判断蛇头坐标是否和食物的坐标重叠
    if (row == this.food.row && col === this.food.col) {
        // 吃到食物
        return true;
    }
}

// 改变食物的位置
Game.prototype.changeFood = function() {
    var position = this.snake.position.concat(this.stone.position);
    // 获得随机的食物坐标
    var food = {
        row: parseInt(Math.random() * this.map.row),
        col: parseInt(Math.random() * this.map.col)
    }
    // 备份this
    var me = this;
    position.forEach(function(value) {
        // console.log(value);
        if (value.row == food.row && value.col == food.col) {
            // 重新随机
            return me.changeFood();
        }
    });
    
    return food;

};

