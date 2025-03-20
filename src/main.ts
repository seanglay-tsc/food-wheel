import p5 from "p5";
import "./style.css";
import { Wheel } from "./spin";

let foodWheel: Wheel | null = null;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(600, 600);
    foodWheel = new Wheel(p, 400);

    foodWheel.addSegment("Amok");
    foodWheel.addSegment("Kuy Teav");
    foodWheel.addSegment("Bai Sach");
    foodWheel.addSegment("Khmer Curry");
    foodWheel.addSegment("Lort Cha");
    foodWheel.addSegment("Nom Chok");
    foodWheel.addSegment("Samlor");
    foodWheel.addSegment("Banh Xeo");
    foodWheel.addSegment("Prahok");
    foodWheel.addSegment("Kralan");
    foodWheel.addSegment("Cha Kroeung");
    foodWheel.addSegment("Bai Makkhue");
    foodWheel.addSegment("Nhoam");
    foodWheel.addSegment("Sang Khum");
    foodWheel.addSegment("Chhrang");
    foodWheel.addSegment("Tarantula");
    foodWheel.addSegment("Chek Khtong");

    p.textFont("Helvetica");
  };

  p.draw = () => {
    p.background("#f5eee6");
    p.fill("orange");
    p.noStroke();
    p.ellipse(p.width / 2, p.height / 2, 420, 420);

    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(18);

    if (foodWheel) {
      foodWheel.update();
      foodWheel.show();
    }

    p.fill(0);
    p.textAlign(p.LEFT);
    p.text(p.floor(p.frameRate()), 50, 50);
  };
};

new p5(sketch);

document.getElementById("spinButton")?.addEventListener("click", () => {
  if (foodWheel) {
    foodWheel.spin();
  }
});
