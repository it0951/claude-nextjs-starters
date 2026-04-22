import path from "node:path";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  renderToStream,
} from "@react-pdf/renderer";

// 서버사이드 절대 경로로 한글 폰트 등록
Font.register({
  family: "NotoSansKR",
  src: path.join(process.cwd(), "public/fonts/NotoSansKR-Regular.ttf"),
});

const styles = StyleSheet.create({
  page: { padding: 30 },
  text: { fontSize: 14, fontFamily: "NotoSansKR" },
});

function TestDoc() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>안녕하세요 견적서</Text>
      </Page>
    </Document>
  );
}

export async function GET(): Promise<Response> {
  const stream = await renderToStream(<TestDoc />);

  // v4 타입 정의와 BodyInit 불일치 — unknown 경유 캐스트 (any 금지)
  return new Response(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="test-korean.pdf"',
    },
  });
}
