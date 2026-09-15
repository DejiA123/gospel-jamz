REVOKE EXECUTE ON FUNCTION public.grant_admin_to_organiser() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;