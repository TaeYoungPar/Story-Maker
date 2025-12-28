export default function Footer() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto max-w-6xl px-6 py-8 text-sm">
        <div className="flex items-center justify-center sm:flex-row">
          <span>© {new Date().getFullYear()} StoryMaker</span>
        </div>
      </div>
    </footer>
  );
}
