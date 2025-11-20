
export interface VideoData {
  video_url: string;
  title: string;
  thumbnail: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok' | string;
}

export interface ApiResponse {
  video_url?: string;
  title?: string;
  thumbnail?: string;
  platform?: string;
  error?: string;
}
