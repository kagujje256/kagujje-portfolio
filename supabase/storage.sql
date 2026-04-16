INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('writings', 'writings', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('files', 'files', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public read avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Public read projects" ON storage.objects FOR SELECT USING (bucket_id = 'projects');
CREATE POLICY "Public read writings" ON storage.objects FOR SELECT USING (bucket_id = 'writings');
CREATE POLICY "Public read files" ON storage.objects FOR SELECT USING (bucket_id = 'files');