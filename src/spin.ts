import p5 from "p5";

export class Wheel {
  private circleRadius: number;
  private startingRadius: number = 0;
  private radiusAddition: number = 0;
  private spinSpeed: number = 0;
  private currentlyPointed: number = 0;
  private segments: string[] = [];
  private triangleRotation: number = 0;

  constructor(
    private p: p5,
    radius: number,
  ) {
    this.circleRadius = radius;
  }

  addSegment(name: string) {
    const truncatedName = name.length > 12 ? name.slice(0, 12) + "..." : name;
    this.segments.push(truncatedName);
    this.radiusAddition = this.p.TWO_PI / this.segments.length;
  }

  update() {
    if (this.spinSpeed > 0) {
      this.startingRadius += Math.abs(Math.sin(this.spinSpeed));
      if (this.startingRadius > this.p.TWO_PI) {
        this.startingRadius = 0;
      }
      this.spinSpeed *= 0.97;
      if (this.spinSpeed < 0.001) {
        this.spinSpeed = 0;
      }
    }
  }

  show() {
    const p = this.p;
    const { width, height } = p;
    let xx = width / 2,
      yy = height / 2;
    const len = this.segments.length;
    let currentRad = this.startingRadius;
    let colorIndex = 0;

    if (len > 1) {
      for (let i = 0; i < len; i++) {
        const colors = ["#ffeaa5", "#fe5f55", "#c7efcf", "#eef5db"];
        p.fill(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;

        let nextRad = currentRad + this.radiusAddition;
        if (nextRad > p.TWO_PI) nextRad -= p.TWO_PI;

        if (nextRad <= p.HALF_PI + this.radiusAddition && nextRad > p.HALF_PI) {
          if (this.currentlyPointed !== i) {
            this.triangleRotation = -0.3;
            this.currentlyPointed = i;
          }
          p.fill("#32cd32");
        }

        p.arc(
          xx,
          yy,
          this.circleRadius,
          this.circleRadius,
          currentRad,
          nextRad,
        );
        p.fill(0);
        p.push();
        p.translate(xx, yy);
        p.rotate(currentRad + this.radiusAddition / 2);
        p.text(this.segments[i], 60, 0);
        p.pop();

        currentRad += this.radiusAddition;
        if (currentRad > p.TWO_PI) currentRad -= p.TWO_PI;
      }
    } else if (len === 1) {
      p.fill(255);
      p.ellipse(xx, yy, this.circleRadius, this.circleRadius);
      p.fill(0);
      p.text(this.segments[0], xx, yy);
    }

    // Draw the triangle
    p.fill("orange");
    p.stroke(0);
    p.strokeWeight(2);
    xx = p.width / 2;
    yy = p.height / 2 + this.circleRadius / 2;
    p.push();
    p.translate(xx, yy);
    if (this.triangleRotation < 0) {
      p.rotate(this.triangleRotation);
      this.triangleRotation += 0.025;
    }
    p.triangle(-5, 0, 5, 0, 0, -40);
    p.pop();
  }

  spin() {
    this.startingRadius = this.p.random(this.p.TWO_PI);
    this.spinSpeed = 0.5;
  }
}
