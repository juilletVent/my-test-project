import { useCallback, MouseEvent, useMemo } from "react";
import { throttle } from "lodash";
import { Card, Layout } from "./style";
import img1 from "@/img/91065053_p0.png";
import img2 from "@/img/91077302_p0.jpg";
import img3 from "@/img/93299460_p0.png";
import img4 from "@/img/98052048_p0.png";
import img5 from "@/img/luna-asahi.png";
import img6 from "@/img/skirt.jpg";

interface props {}

const imgs = [img1, img2, img3, img4, img5, img6];

function HoverCard(props: props) {
  const setStyle = useCallback((target: any, style: any) => {
    target.style = style;
  }, []);
  const setStyle50ms = useMemo(() => throttle(setStyle, 50), [setStyle]);
  const onMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const style =
        "transform:perspective(1000px) rotateX(0px) rotateY(0px) scale(1);";
      e.target.addEventListener(
        "transitionend",
        () => setStyle(e.target, style),
        {
          once: true,
        }
      );
    },
    [setStyle]
  );
  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // @ts-ignore
      const nodePosition = e.target.getBoundingClientRect();
      const x = e.clientX - nodePosition.left;
      const y = e.clientY - nodePosition.top;
      const centerX = nodePosition.width / 2;
      const centerY = nodePosition.height / 2;
      // 最大偏转角度
      const baseDeg = 20;

      const rotateXDeg = (baseDeg * (y - centerY)) / centerY;
      const rotateYDeg = (baseDeg * (centerX - x)) / centerX;

      const style = `transform:perspective(1000px) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) scale(1.05);`;
      setStyle50ms(e.target, style);
    },
    [setStyle50ms]
  );

  return (
    <Layout>
      {imgs.map((img) => (
        <Card key={img} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
          <img src={img} alt="img1" />
        </Card>
      ))}
    </Layout>
  );
}

export default HoverCard;
