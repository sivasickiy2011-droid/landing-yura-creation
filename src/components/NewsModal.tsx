import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  title: string;
  description: string;
  fullContent?: string;
  link: string;
  pubDate: string;
  image?: string;
  category?: string;
}

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: NewsItem | null;
}

const NewsModal = ({ open, onOpenChange, news }: NewsModalProps) => {
  if (!news) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            {news.image && (
              <div className="relative w-full h-48 sm:h-56 md:h-64 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-3 sm:mb-4">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            
            <div className="space-y-2">
              {news.category && (
                <Badge className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  {news.category}
                </Badge>
              )}
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                {news.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Icon name="Calendar" size={14} className="sm:w-4 sm:h-4" />
                  <span>{formatDate(news.pubDate)}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Icon name="Clock" size={14} className="sm:w-4 sm:h-4" />
                  <span>5 мин чтения</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            {news.fullContent ? (
              <div dangerouslySetInnerHTML={{ __html: news.fullContent }} />
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {news.description}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg">
                  <p className="text-sm sm:text-base text-gray-700">
                    Это краткое описание статьи. Для просмотра полной версии 
                    перейдите по ссылке на первоисточник ниже.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <Icon name="ExternalLink" size={18} className="text-gray-400 mt-0.5 sm:mt-0 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Источник:</p>
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium hover:underline break-words"
                >
                  {new URL(news.link).hostname}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={() => window.open(news.link, "_blank")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                <span className="truncate">Читать на сайте источника</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 text-sm sm:text-base"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;