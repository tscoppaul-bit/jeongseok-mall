export type Book = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  pages: number;
};

export const books: Book[] = [
  { id: "b01", title: "정석 국어 문법", subtitle: "품사부터 문장까지 한 번에", price: 12000, pages: 132 },
  { id: "b02", title: "정석 수학 기초", subtitle: "연산의 원리를 다시 세우다", price: 15000, pages: 168 },
  { id: "b03", title: "정석 영어 독해", subtitle: "문장 구조로 읽는 법", price: 14000, pages: 150 },
  { id: "b04", title: "정석 한국사", subtitle: "흐름으로 잡는 통사", price: 13000, pages: 144 },
  { id: "b05", title: "정석 글쓰기", subtitle: "쓰기 전에 정리하는 습관", price: 11000, pages: 96 },
  { id: "b06", title: "정석 발표법", subtitle: "떨지 않고 전달하기", price: 11000, pages: 88 },
  { id: "b07", title: "정석 독서 노트", subtitle: "읽고 남기는 기록의 기술", price: 9000, pages: 72 },
  { id: "b08", title: "정석 시간 관리", subtitle: "계획이 무너지지 않게", price: 10000, pages: 84 },
  { id: "b09", title: "정석 면접 준비", subtitle: "질문의 의도를 읽다", price: 16000, pages: 120 },
  { id: "b10", title: "정석 공부 습관", subtitle: "매일 이어가는 힘", price: 9000, pages: 76 },
];