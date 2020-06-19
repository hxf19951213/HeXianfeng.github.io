/**
 * @Snake: 蛇类
 * @imgs: 多张图片
 * 
*/
function Snake(imgs) {
    // 头部的图片
    this.head = imgs.head;
    // 设置蛇头图片的索引
    this.head_idx = 2;
    // 身体图片
    this.body = imgs.body; 
    // 尾部图片
    this.tail = imgs.tail;
    // 设置尾部图片的索引
    this.tail_idx = 0;
    // 定义蛇的位置
    // 分成三部分 ，第一个元素为蛇尾巴，最后一个为蛇头，其他为蛇身
    this.position = [
        {row:3, col: 1}, 
        {row:3, col: 2},
        {row:3, col: 3},
        // {row:3, col: 4},
        // {row:3, col: 5},
        // {row:3, col: 6},
    ];
    // 定义蛇头的方向   左 37 0 上  38  1 右 39  2 下 40 3
    this.direction = 39;
    // 定义锁
    this.lock = false;
}

Snake.prototype.move = function() {
    // 设置锁
    lock = true;
    // 获得原来的头部的坐标
    var new_head = {
        row: this.position[this.position.length - 1].row,
        col: this.position[this.position.length - 1].col,
    }
    // 判断蛇头的方向,确定蛇头图片的索引，新蛇头的位置
    if (this.direction == 37) {
        // 头部图片索引
        this.head_idx = 0;
        // 获得新蛇头的坐标 列--
        new_head.col--;
    } else if (this.direction == 38) {
        // 头部图片索引
        this.head_idx = 1;
        // 获得新蛇头的坐标 行--
        new_head.row--;
    } else if (this.direction == 39) {
        // 头部图片索引
        this.head_idx = 2;
        // 获得新蛇头的坐标 列++
        new_head.col++;
    }else if (this.direction == 40) {
        // 头部图片索引
        this.head_idx = 3;
        // 获得新蛇头的坐标 行++
        new_head.row++;

    }

    // 去掉数组的第一个元素，增加新元素（新蛇头）
    this.position.shift();
    this.position.push(new_head);
    
    // 获得尾巴
    var tail = this.position[0];
    // 获得尾巴的前一个元素屁股
    var pg = this.position[1];
    // 判断蛇尾部图片的索引
    if (tail.row == pg.row) {
        this.tail_idx = tail.col > pg.col ? 2: 0;
    } else {
        this.tail_idx = tail.row > pg.row ? 3: 1;
    }

    // 开锁
    this.lock = false;
}

// 蛇改变方向
Snake.prototype.change = function(key) {
    if (this.lock) {
        return;
    }
    // 新的方向不能和原来相同或者相反
    if (Math.abs(key- this.direction) % 2 != 0) {
        // 方向和法
        this.direction = key;
    }
}

// 长身体
Snake.prototype.growUp = function() {
    // 将数组的头部移除放入数组的尾部
    var tail = {
        row: this.position[0].row,
        col: this.position[0].col
    }
    this.position.unshift(tail);
    
}