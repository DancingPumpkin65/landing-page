class CollisionBlock {
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgb(153, 29, 29)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}