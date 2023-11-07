import { createClient } from '@supabase/supabase-js'

const URL = 'https://pwxuzuncxbenrikrltqv.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eHV6dW5jeGJlbnJpa3JsdHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTY4OTgsImV4cCI6MjAxNDA5Mjg5OH0.OYZECJZeLdAmdmw0fVMNb_DIuAqebyvzsJw0ih0QD28';

export const supabase = createClient(URL, API_KEY);

