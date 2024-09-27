import { supabase } from "../lib/supabase";

export async function saveChat(chatContent: string) {
    console.log('Attempting to save chat');
    const { data: { user } } = await supabase.auth.getUser();
    console.log('User:', user);
    if (!user) {
      console.error('No authenticated user found');
      return;
    }
  
    const { data, error } = await supabase
      .from('user_chats')
      .insert({ 
        user_id: user.id, 
        chat_content: chatContent 
      });
  
    if (error) console.error('Error saving chat:', error);
    else console.log('Chat saved successfully:', data);
  }
export async function getUserChats() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No authenticated user found');
    return [];
  }

  const { data, error } = await supabase
    .from('user_chats')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
  return data;
}