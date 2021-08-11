// SET UP BALLS
let pool = document.getElementById('pool-table')
let table = pool.getBoundingClientRect()
let white = document.getElementById('white')
let red = document.getElementById('red')

white.style.left = table.left + table.width/3 + 'px'
red.style.left = table.left + 2/3 * table.width + 'px'

balls = [white, red]

balls.forEach(ball => {
    radius = table.width/50;
    ball.style.height = 2*radius + 'px'
    ball.style.top = table.top+table.height/2 - radius + "px";
});

// MARKS ON WALLS
let whiter = white.getBoundingClientRect();
let redr = red.getBoundingClientRect();
let mrks = marks();
let tiks = ['top','bottom', 'left', 'right'];

for (let index = 0; index < 2; index++) {
    let m = document.getElementById(tiks[index]);
    m.style.left = whiter.left + mrks[index] + radius + 'px';
    m.style.top = table.top + index*(table.height -10) + 'px';
}

for (let index = 0; index < 2; index++) {
    let m = document.getElementById(tiks[index+2]);
    m.style.left = table.left + index*(table.width-10) + 'px';
    m.style.top = whiter.top + mrks[index+2] + radius + 'px';
}

// MOVE BALLS
balls.forEach(ball => {
    ball.addEventListener("mousedown", event => {
        if (event.button == 0) {
            pool.addEventListener("mousemove", moved);
            event.preventDefault();
        }
    });
    function moved(event) {
        if (event.buttons == 0) {
            pool.removeEventListener("mousemove", moved);
        } else {
            let rect = ball.getBoundingClientRect();
            let radius = rect.width/2;
            ball.style.left = event.clientX - radius + "px";
            ball.style.top = event.clientY - radius + "px";

            //  MOVE MARKS
            whiter = white.getBoundingClientRect()
            redr = red.getBoundingClientRect()
            mrks = marks()
            for (let index = 0; index < 2; index++) {
                m = document.getElementById(tiks[index]);
                m.style.left = (whiter.left + mrks[index] + radius)+ 'px';
                m.style.top = table.top + index*(table.height -10) + 'px';
            }
            
            for (let index = 0; index < 2; index++) {
                m = document.getElementById(tiks[index+2]);
                m.style.left = table.left + index*(table.width-10) + 'px';
                m.style.top = whiter.top + mrks[index+2] + radius + 'px';
            }
        }
    }    
});

function marks() {
    let a = whiter.top - table.top,
        b = redr.top - table.top, 
        c = whiter.left - table.left, 
        d = redr.left - table.left;
    let top = a/(a+b)*(d-c);
    let left = c/(c+d)*(b-a);
    let bottom = (table.height - a)/(2*table.height - a - b)*(d-c);
    let right = (table.width - c)/(2*table.width - c - d)*(b-a);

    return [top, bottom, left, right];
}   

function set_mark(pos) {

}