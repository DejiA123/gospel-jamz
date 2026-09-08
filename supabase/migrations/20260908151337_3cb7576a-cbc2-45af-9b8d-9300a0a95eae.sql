CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  days_attending TEXT[] NOT NULL DEFAULT '{}',
  group_name TEXT,
  heard_from TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.registrations TO anon;
GRANT INSERT ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND (group_name IS NULL OR char_length(group_name) <= 120)
    AND (heard_from IS NULL OR char_length(heard_from) <= 120)
    AND (notes IS NULL OR char_length(notes) <= 1000)
  );