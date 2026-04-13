import type { NextConfig } from "next";

// 네트워크 환경마다 다른 IP를 환경변수로 주입 가능
// 예: DEV_ORIGIN=192.168.1.100 npm run dev
// 환경변수가 없으면 기본값 192.168.41.157 사용
const devOrigins = process.env.DEV_ORIGIN
  ? [process.env.DEV_ORIGIN]
  : ["192.168.41.157"];

const nextConfig: NextConfig = {
  // 네트워크 IP 접속 시 개발 리소스(HMR, 폰트 등) 허용
  // Next.js 16 보안 정책: cross-origin dev 리소스 기본 차단
  allowedDevOrigins: devOrigins,
};

export default nextConfig;
