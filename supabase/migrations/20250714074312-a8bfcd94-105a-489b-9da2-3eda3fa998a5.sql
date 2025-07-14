
-- Remove the old sample data from the first migration to show only the new Algerian data
DELETE FROM public.electronic_archives 
WHERE project_id IN (1, 2, 3) 
AND archived_by IN ('Fatima Khelifi', 'Omar Boumediene', 'Rachid Benaissa', 'Amina Hadji', 'Said Hamidi', 'Nadia Bencheikh', 'Houria Zeghib');
