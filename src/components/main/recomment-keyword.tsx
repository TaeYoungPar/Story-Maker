export function RecommendedKeywords() {
  const ALL_KEYWORDS = [
    "기괴한 분위기",
    "눈물 쏙 감동",
    "병맛 유머",
    "반전 있는 결말",
    "감동적인 교훈",
    "열린 결말의 묘미",
    "오싹한 반전",
    "황당한 결말",
  ];

  const getDailyKeywords = () => {
    const today = new Date();
    const dateSeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const startIndex = dateSeed % (ALL_KEYWORDS.length - 3);
    return ALL_KEYWORDS.slice(startIndex, startIndex + 4);
  };

  const dailyKeywords = getDailyKeywords();

  return (
    <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#16181A]">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">🎯</span>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
          오늘의 추천 키워드
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {dailyKeywords.map((keyword) => (
          <button
            key={keyword}
            className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-all hover:scale-105 hover:bg-indigo-600 hover:text-white dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white"
          >
            #{keyword}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-500">
        * 키워드를 참고해서 더 흥미로운 스토리를 만들어보세요!
      </p>
    </div>
  );
}
