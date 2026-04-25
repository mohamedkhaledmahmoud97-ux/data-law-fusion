CREATE TABLE public.cv_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE public.cv_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a CV download"
  ON public.cv_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view download logs"
  ON public.cv_downloads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_cv_downloads_downloaded_at ON public.cv_downloads (downloaded_at DESC);