(function () {
    "use strict";

    let palette;

    window.onload = function() {
        draw();
        // getLocation();
        // showPosition();
        updatePageElementStyles();
    };

    // ---

    function updatePageElementStyles () {
        var body_text = document.getElementsByTagName('body')[0];
        body_text.style.color = palette[1];

        var links = document.getElementsByTagName('a');
        for(let i=0;i < links.length;i++) {
            links[i].style.color = palette[1];
        };
    };


    // ---
    // GEOLOCATION

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            let msg = "Geolocation is not supported by this browser.";
            console.log(msg);
        }
    }

    function showPosition(position) {
        let msg = "\nLatitude:\n" + position.coords.latitude +
            "\n\nLongitude:\n" + position.coords.longitude;
        console.log(msg);
    }

    // ---
    // TREE

    function draw() {
        "use strict";

        let paletteArr = [{
            background: "#00476F",
            1: "#79BD9A",
            2: "#79BD9A",
            3: "#A8DBA8",
            4: "#CFF09E",
            5: "#701122"
        }, {
            background: "#1C140D",
            1: "#FFFFFF",
            2: "#F2E9E1",
            3: "#CBE86B",
            4: "#CBE86B",
            5: "#F2E9E1"
        }, {
            background: "#DCE9BE",
            1: "#2E2633",
            2: "#2E2633",
            3: "#555152",
            4: "#555152",
            5: "#99173C"
        }, {
            background: "#45484B",
            1: "#EEE6AB",
            2: "#EEE6AB",
            3: "#C5BC8E",
            4: "#C5BC8E",
            5: "#C5BC8E"
        }, {
            background: "#D3E2B6",
            1: "#3A8585",
            2: "#68B3AF",
            3: "#87BDB1",
            4: "#87BDB1",
            5: "#AACCB1"
        }]
        palette = paletteArr[Math.floor((Math.random() * paletteArr.length))];

        let branch_segments = 0;

        let canvas = document.getElementById('myCanvas');
        let context = canvas.getContext('2d');

        if (canvas.getContext) {

            // resize the canvas to fill browser window dynamically
            window.addEventListener('resize', resizeCanvas, false);

            function resizeCanvas() {
                canvas.width  = window.innerWidth;
                canvas.height = window.innerHeight;

                let container     = document.getElementsByClassName('container')[0];
                let headers       = document.getElementsByClassName('headers')[0];
                let newLeftMargin = (Math.floor((window.innerWidth * .375)) - Math.floor((headers.offsetWidth * 0.5)));


                console.log(newLeftMargin);
                console.log(window.innerWidth < 500);
                if (window.innerWidth < 500) {
                    container.style.marginLeft = "auto";
                    container.style.marginRight = "auto";
                    container.style.left = "0";
                    container.style.right = "0";
                } else {
                    if (newLeftMargin > 0) {
                        console.log("test");
                        container.style.marginLeft = newLeftMargin + "px";
                    } else {
                        container.style.marginLeft = "0 px";
                    };
                    container.style.marginRight = "0";
                    // container.style.left = "0";
                    // container.style.right = "0";
                }




                if (canvas.width < 480) {
                    branch_segments = 6;
                } else if (canvas.width < 768) {
                    branch_segments = 6;
                } else if (canvas.width < 1240) {
                    branch_segments = random(7, 7);
                } else if (canvas.width < 1440) {
                    branch_segments = random(7, 7);
                } else {
                    branch_segments = random(7, 7);
                };

                drawFractalTree(context);
            }
            resizeCanvas();
        } else {
            alert("HTML5 Canvas isn't supported by your browser!");
        }

        // ---

        document.body.style.backgroundColor = palette.background;

        function drawFractalTree(context) {
            drawTree(context, Math.floor(canvas.width * 0.625), canvas.height, -90, branch_segments);
        }

        function drawTree(context, x1, y1, angle, depth) {

            let BRANCH_LENGTH = random(0, 20);

            if (depth != 0) {
                let x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
                let y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);

                drawLine(context, x1, y1, x2, y2, depth);
                drawTree(context, x2, y2, angle - random(15, 20), depth - 1);
                drawTree(context, x2, y2, angle + random(15, 20), depth - 1);
            }
        }

        function drawLine(context, x1, y1, x2, y2, thickness) {
            context.fillStyle = '#000';
            if (thickness >= 10) {
                context.strokeStyle = palette[1];
            } else if (thickness >= 7) {
                context.strokeStyle = palette[2];
            } else if (thickness >= 4) {
                context.strokeStyle = palette[3];
            } else if (thickness >= 2) {
                context.strokeStyle = palette[4];
            } else if (thickness == 1) {
                context.strokeStyle = palette[5];
            };

            context.lineWidth = thickness * 1.5;
            context.beginPath();

            context.moveTo(x1, y1);
            context.lineTo(x2, y2);

            context.closePath();
            context.stroke();
        }


        function cos(angle) {
            return Math.cos(deg_to_rad(angle));
        }

        function sin(angle) {
            return Math.sin(deg_to_rad(angle));
        }

        function deg_to_rad(angle) {
            return angle * (Math.PI / 180.0);
        }

        function random(min, max) {
            return min + Math.floor(Math.random() * (max + 1 - min));
        }
    }

})();
