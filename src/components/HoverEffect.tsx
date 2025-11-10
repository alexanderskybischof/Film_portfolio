import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HoverEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // === Scene setup ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 1.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // === Video texture ===
    const video = document.createElement("video");
    video.src = "/sample.mp4"; // Ensure sample.mp4 is in /public
    video.loop = true;
    video.muted = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // === Uniforms ===
    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_hover: { value: 0.0 },
      u_texture: { value: videoTexture },
    };

    // === Shaders ===
    const vertexShader = `
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_hover;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Only protrude when hovering
        float dist = distance(uv, u_mouse);
        float wave = sin(u_time * 2.0 + dist * 10.0) * 0.03;
        pos.z += u_hover * ((0.15 * smoothstep(0.5, 0.0, dist)) + wave);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture;
      varying vec2 vUv;

      void main() {
        float pixelSize = 0.003;
        vec2 uv = floor(vUv / pixelSize) * pixelSize;
        vec4 pixelColor = texture2D(u_texture, uv);
        gl_FragColor = pixelColor;
      }
    `;

    // === Mesh ===
    const geometry = new THREE.PlaneGeometry(1.5, 1, 256, 256);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // === Mouse events ===
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      uniforms.u_mouse.value.x = (e.clientX - rect.left) / rect.width;
      uniforms.u_mouse.value.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseenter", handleMouseEnter);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);

    // === Animate ===
    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      // Smoothly transition hover intensity
      uniforms.u_hover.value += ((isHovering.current ? 1.0 : 0.0) - uniforms.u_hover.value) * 0.08;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === Cleanup ===
    return () => {
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseenter", handleMouseEnter);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    />
  );
};

export default HoverEffect;
