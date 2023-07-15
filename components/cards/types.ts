export enum CardContentType {
  Text = "text",
}

interface BaseCardContent {
  type: CardContentType;
}

export interface TextCardContent extends BaseCardContent {
  type: CardContentType.Text;
  content: string;
}

export type CardContent = TextCardContent;

export interface CardInfo {
  frontContent: CardContent;
  backContent: CardContent;
}

export interface CardSetInfo {
  id: string;
  title: string;
  cardCount: number;
}
