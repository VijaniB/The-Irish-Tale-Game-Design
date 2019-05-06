function Man(start_left, start_bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = 0;
    this.jumping = false;
    this.jump_height = 0;
    this.jump_ascending;
    this.pos_x = start_left;
    this.initial_pos_y = start_bottom - this.height;
    this.stopped = false;
}

Man.prototype = {
    file: 'assets/man.png',
    width: 60,
    height: 83,
    frames: [
        { top: 0, left: 4 },
        { top: 0, left: 58 },
        { top: 0, left: 117 },
        { top: 0, left: 176 },
        { top: 0, left: 235 },
        { top: 0, left: 294 },
        { top: 0, left: 353 },
        { top: 0, left: 412 },
          ],
    jump_freeze_frame: 7,
    jump_step: function() {
        return (this.jump_max_height * 1.5 - this.jump_height) * 0.15;
    },
    gravity: 10,
    jump_max_height: 100,
    startJump: function() {
        if (!this.jumping && !this.stopped) {
            this.jumping = true;
            this.jump_ascending = true;
        }
    },
    endJump: function() {
        if (this.jumping) {
            this.jump_ascending = false;
        }
    },
    update: function() {
        if (!this.stopped) {
            if (this.jumping) {
                this.current_frame = this.jump_freeze_frame;
                if (this.jump_ascending) {
                    if (this.jump_height < this.jump_max_height) {
                        this.jump_height += this.jump_step();
                    } else {
                        this.jump_ascending = false;
                    }
                }
            } else {
                this.current_frame = (this.current_frame + 1) % this.frames.length;
            }
        } else {
            this.current_frame = 4;
        }
        this.jump_height -= this.gravity;
        if (this.jump_height < 0) {
            this.jumping = false;
            this.jump_height = 0;
        }
        this.pos_y = this.initial_pos_y - this.jump_height;
    },
    drawOn: function(ctx) {
        let frame = this.frames[this.current_frame];
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x | 0, this.pos_y | 0, this.width, this.height);
    },
    collisionRect: function() {
        return {
            x: (this.pos_x | 0) + 35,
            y: this.pos_y | 0,
            width: this.width - 35,
            height: this.height - 10
        };
    },
    stop: function() {
        this.stopped = true;
    },
    restart: function() {
        this.stopped = false;
    }
}
