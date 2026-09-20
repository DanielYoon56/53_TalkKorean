import { useState, useCallback, useRef } from 'react';
import { ChatCorrection, ChatVocabulary, SuggestedReply } from '../types';

export interface SessionMessage {
  id: string;
  sender: 'user' | 'ai' | 'tutor' | 'system' | 'assistant';
  korean?: string;
  text?: string;
  romanized?: string;
  english?: string;
  feedbackKo?: string;
  feedbackEn?: string;
  timestamp?: string;
  translation?: string;
  correction?: ChatCorrection;
  vocabulary?: ChatVocabulary[];
  suggestedReplies?: SuggestedReply[];
  culturalTip?: string;
}

export class ChatSessionManager {
  private sessionKey: string;
  private messages: SessionMessage[] = [];

  constructor(sessionKey: string = 'chat_session_history', initialMessages: SessionMessage[] = []) {
    this.sessionKey = sessionKey;
    this.loadSession(initialMessages);
  }

  /**
   * Load stored messages from sessionStorage (or fall back to initialMessages)
   */
  public loadSession(initialMessages: SessionMessage[] = []): SessionMessage[] {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const stored = sessionStorage.getItem(this.sessionKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.messages = parsed;
            return this.messages;
          }
        }
      }
    } catch (err) {
      console.warn('ChatSessionManager failed to read from storage:', err);
    }
    this.messages = [...initialMessages];
    this.persist();
    return this.messages;
  }

  /**
   * Get all messages in current session
   */
  public getMessages(): SessionMessage[] {
    return [...this.messages];
  }

  /**
   * Add a new message to persistent session array
   */
  public addMessage(msg: SessionMessage): SessionMessage[] {
    this.messages.push(msg);
    this.persist();
    return [...this.messages];
  }

  /**
   * Set or overwrite current session messages
   */
  public setMessages(msgs: SessionMessage[]): SessionMessage[] {
    this.messages = [...msgs];
    this.persist();
    return [...this.messages];
  }

  /**
   * Clear or reset current session
   */
  public resetSession(initialMessages: SessionMessage[] = []): SessionMessage[] {
    this.messages = [...initialMessages];
    this.persist();
    return [...this.messages];
  }

  /**
   * Persist to sessionStorage
   */
  private persist(): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(this.sessionKey, JSON.stringify(this.messages));
      }
    } catch (err) {
      console.warn('ChatSessionManager failed to persist storage:', err);
    }
  }

  /**
   * Serialize entire conversation array into structured context string for Gemini prompt
   */
  public serializeContext(): string {
    if (this.messages.length === 0) {
      return '(This is the beginning of the conversation)';
    }

    return this.messages.map((turn, index) => {
      const role = turn.sender === 'user' ? 'Student' : 'AI Partner';
      const content = turn.korean || turn.text || '';
      return `[Turn ${index + 1}] ${role}: ${content}`;
    }).join('\n');
  }
}

export function useChatSessionManager(sessionKey: string, initialMessages: SessionMessage[] = []) {
  const managerRef = useRef<ChatSessionManager | null>(null);
  if (!managerRef.current) {
    managerRef.current = new ChatSessionManager(sessionKey, initialMessages);
  }

  const [messages, setMessagesState] = useState<SessionMessage[]>(() => managerRef.current!.getMessages());

  const addMessage = useCallback((msg: SessionMessage) => {
    const updated = managerRef.current!.addMessage(msg);
    setMessagesState(updated);
    return updated;
  }, []);

  const setMessages = useCallback((msgs: SessionMessage[]) => {
    const updated = managerRef.current!.setMessages(msgs);
    setMessagesState(updated);
    return updated;
  }, []);

  const resetSession = useCallback((newInitial: SessionMessage[] = []) => {
    const updated = managerRef.current!.resetSession(newInitial);
    setMessagesState(updated);
    return updated;
  }, []);

  const serializeContext = useCallback(() => {
    return managerRef.current!.serializeContext();
  }, []);

  return {
    messages,
    addMessage,
    setMessages,
    resetSession,
    serializeContext,
    sessionManager: managerRef.current
  };
}
