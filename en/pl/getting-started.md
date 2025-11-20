# Pierwsze kroki z BerryBoo AI

**Szybki przewodnik startowy dla nowych użytkowników**

---

## Witamy!

Ten przewodnik pomoże Ci szybko rozpocząć pracę z BerryBoo AI. Niezależnie od tego, czy jesteś właścicielem biznesu, menedżerem marketingu czy deweloperem, znajdziesz tutaj wszystko, czego potrzebujesz.

---

## Dla użytkowników biznesowych

### Krok 1: Zrozum, co robi BerryBoo AI

BerryBoo AI automatycznie analizuje Twoje dane e-commerce i zapewnia eksperckie rekomendacje. Dowiedz się więcej:
- **[Wprowadzenie](/pl/intro)** - Czym jest BerryBoo AI?
- **[Kontekst biznesowy](/pl/business-context)** - Wartość i ROI

### Krok 2: Połącz swoją analitykę

BerryBoo AI łączy się z Twoimi istniejącymi narzędziami analitycznymi:
- Google Analytics 4
- Google Search Console
- Google Ads
- Meta Ads
- PageSpeed Insights

**Uwaga**: Będziesz potrzebować dostępu OAuth do tych usług. System przeprowadzi Cię przez proces połączenia.

### Krok 3: Przejrzyj rekomendacje

Po połączeniu BerryBoo AI będzie:
1. Automatycznie analizować Twoje dane
2. Wykrywać anomalie i możliwości
3. Generować eksperckie rekomendacje
4. Dostarczać spostrzeżenia w jasnym polskim języku biznesowym

### Krok 4: Wdróż rekomendacje

Każda rekomendacja zawiera:
- Jasny plan działania
- Oczekiwany wpływ
- Szacunek czasu
- Poziom priorytetu

---

## Dla deweloperów

### Wymagania wstępne

- Python 3.10+
- PostgreSQL 14+
- Dostęp do API OpenAI
- Poświadczenia OAuth dla usług analitycznych

### Szybka konfiguracja

#### 1. Zainstaluj zależności

```bash
cd backend/src/ai
pip install -r requirements.txt
pip install RestrictedPython  # Dla sandboxu wykonania kodu
```

#### 2. Skonfiguruj środowisko

```bash
cp env_example .env
# Edytuj .env z Twoimi poświadczeniami:
# - OPENAI_API_KEY
# - Poświadczenia bazy danych
# - Domyślne ID sklepu
```

#### 3. Przetestuj instalację

```bash
# Przetestuj połączenie z bazą danych
python test_db_connection.py

# Przetestuj podstawowe CLI
python main.py --help

# Przetestuj z domyślnym sklepem
python main.py chat-ga4
```

### Następne kroki

- **[Zacznij tutaj](/pl/start-here)** - Kompletny onboarding deweloperów
- **[Przegląd systemu](/pl/system-overview)** - Dokumentacja architektury
- **[Referencja CLI](/pl/cli-reference)** - Wszystkie dostępne polecenia
- **[Przewodnik rozwoju](/pl/development-guide)** - Jak rozszerzyć system

---

## Struktura dokumentacji

### Zrozumienie systemu
1. **[Zacznij tutaj](/pl/start-here)** - Onboarding deweloperów
2. **[Przegląd systemu](/pl/system-overview)** - Architektura i przepływ danych

### Infrastruktura podstawowa
3. **[Schemat bazy danych](/pl/database-schema)** - Struktura bazy danych
4. **[Architektura wielodostępowa](/pl/multi-tenant)** - Izolacja wielu sklepów

### Integracja MCP
5. **[Integracja MCP](/pl/mcp-integration)** - Kompletny przewodnik MCP
6. **[Przewodnik integracji MCP](/pl/mcp-integration-guide)** - Szczegóły integracji
7. **[Struktura nazewnictwa MCP](/pl/mcp-naming-structure)** - Konwencje nazewnictwa

### Architektura agentów AI
8. **[Agenci główni](/pl/agents-master)** - Reaktywni i proaktywni agenci główni
9. **[Zespoły specjalistów](/pl/agents-specialist-teams)** - 4 zespoły ekspertów domenowych
10. **[Agenci wyspecjalizowani](/pl/agents-specialized)** - 48 wyspecjalizowanych agentów MCP

### Rozwój i użycie
11. **[Referencja CLI](/pl/cli-reference)** - Wszystkie polecenia CLI
12. **[Przewodnik rozwoju](/pl/development-guide)** - Rozszerz system
13. **[Docker](/pl/docker)** - Konfiguracja Docker

---

## Kluczowe koncepcje

### System dwutorowy

BerryBoo AI działa z dwoma równoległymi pipeline'ami:

- **Pipeline reaktywny**: Reaguje na wykryte anomalie (problemy)
- **Pipeline proaktywny**: Odkrywa możliwości poprzez codzienną analizę

### Architektura wieloagentowa

- **Agenci główni**: Przetwarzają wstępnie i kierują zadania
- **Zespoły specjalistów**: 4-agentowe zespoły konsultacyjne
- **Agenci wyspecjalizowani**: 48 agentów MCP do zbierania danych

### Wsparcie wielodostępowe

Każdy sklep klienta ma:
- Izolowane dane i poświadczenia
- Niezależne tokeny OAuth
- Bezpieczne wykonanie sandboxu

---

## Typowe zadania

### Uruchamianie analizy

```bash
# Analizuj anomalie
python main.py process-anomalies --shop-id <shop-id>

# Przetwarzaj spostrzeżenia MCP
python main.py process-insights --shop-id <shop-id>

# Pobierz rekomendacje
python main.py get-recommendations --shop-id <shop-id>
```

### Łączenie nowego sklepu

1. Klient autoryzuje przez dashboard
2. Tokeny OAuth przechowywane w bazie danych
3. Użyj parametru `--shop-id` w CLI
4. System automatycznie używa poprawnych poświadczeń

### Przeglądanie rekomendacji

Rekomendacje są przechowywane w tabeli `ai_recommendations` i mogą być:
- Przeglądane w dashboardzie
- Eksportowane przez API
- Dostępne przez CLI

---

## Rozwiązywanie problemów

### Problemy z połączeniem

- Sprawdź, czy tokeny OAuth są ważne
- Sprawdź łączność z bazą danych
- Upewnij się, że klucze API są skonfigurowane

### Problemy z wydajnością

- Sprawdź ustawienia optymalizacji systemu
- Przejrzyj logi przetwarzania
- Zweryfikuj indeksy bazy danych

### Jakość rekomendacji

- Przejrzyj konfiguracje zespołów specjalistów
- Sprawdź jakość danych w tabelach źródłowych
- Zweryfikuj wyjścia agentów MCP

---

## Wsparcie

Aby uzyskać bardziej szczegółowe informacje:
- Zobacz [Przegląd systemu](/pl/system-overview) dla szczegółów architektury
- Sprawdź [Referencję CLI](/pl/cli-reference) dla opcji poleceń
- Przejrzyj [Przewodnik rozwoju](/pl/development-guide) dla rozszerzania systemu

---

## Następne kroki

1. **Użytkownicy biznesowi**: Przejrzyj [Wprowadzenie](/pl/intro) i [Kontekst biznesowy](/pl/business-context)
2. **Deweloperzy**: Zacznij od [Zacznij tutaj](/pl/start-here) dla kompleksowego onboardingu
3. **Wszyscy**: Poznaj strukturę dokumentacji powyżej

Witamy w BerryBoo AI! 🚀

