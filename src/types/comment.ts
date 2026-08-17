export interface CommentAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  adId: string;
  author: CommentAuthor;
  body: string;
  rating: number;
  likes: number;
  createdAt: string;
}

export interface SubmitCommentPayload {
  body: string;
  rating: number;
}

export interface LikeResponse {
  adId: string;
  isLiked: boolean;
  likes: number;
}

export interface FavoriteResponse {
  adId: string;
  isFavorite: boolean;
}

export interface ViewResponse {
  adId: string;
  views: number;
}
