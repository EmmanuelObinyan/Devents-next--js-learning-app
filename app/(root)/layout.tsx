import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <section>
<NavBar/>
<div style={{ minHeight: '100%', position: 'absolute', top: 0, inset: 0, zIndex: -1 }}>
  <LightRays
    raysOrigin="top-center-offset"
    raysColor="#5dfeca"
    raysSpeed={0.5}
    lightSpread={0.9}
    rayLength={1.4}
    followMouse={true}
    mouseInfluence={0.02}
    noiseAmount={0.0}
    distortion={0.01}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
</div>
      <main>
         {children}
      </main>
    </section> 
    )
}

