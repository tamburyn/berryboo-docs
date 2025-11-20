# 🚀 ZACZNIJ TUTAJ - Onboarding deweloperów BerryBoo AI

**Witamy w systemie BerryBoo AI!**

To jest Twój punkt startowy do zrozumienia całego systemu analityki i rekomendacji e-commerce napędzanego przez AI.

---

## 📖 **Czym jest BerryBoo AI?**

BerryBoo AI to **zaawansowany wieloagentowy system AI**, który zapewnia inteligentną analitykę e-commerce i rekomendacje do działania dla sklepów internetowych. Łączy:

- **Wykrywanie anomalii w czasie rzeczywistym** z wielu źródeł danych
- **48 wyspecjalizowanych agentów MCP**, które analizują Google Analytics, Search Console, Meta Ads, Google Ads i PageSpeed
- **Wieloagentowe zespoły specjalistów** (Marketing Performance, SEO, UX, GSC), które zapewniają eksperckie konsultacje
- **Automatyczne generowanie rekomendacji** w polskim języku biznesowym
- **Architektura wielodostępowa** obsługująca nieograniczoną liczbę sklepów klientów

---

## 🗺️ **Kolejność czytania dokumentacji**

Postępuj zgodnie z tą sekwencją, aby zrozumieć system od podstaw:

### **1. Zrozumienie systemu** (Zacznij tutaj)
1. **[Zacznij tutaj](/pl/start-here)** ← Jesteś tutaj
2. **[Przegląd systemu](/pl/system-overview)** - Architektura, przepływ danych i kluczowe koncepcje

### **2. Infrastruktura podstawowa**
3. **[Schemat bazy danych](/pl/database-schema)** - Struktura i relacje bazy danych
4. **[Architektura wielodostępowa](/pl/multi-tenant)** - Architektura wielodostępowa i izolacja sklepów

### **3. Integracja MCP** (Model Context Protocol)
5. **[Integracja MCP](/pl/mcp-integration)** - Kompletny przewodnik MCP, serwery i wykonanie kodu
6. **[Przewodnik integracji MCP](/pl/mcp-integration-guide)** - Szczegóły integracji
7. **[Struktura nazewnictwa MCP](/pl/mcp-naming-structure)** - Konwencje nazewnictwa

### **4. Architektura agentów AI**
8. **[Agenci główni](/pl/agents-master)** - Reaktywni i proaktywni agenci główni
9. **[Zespoły specjalistów](/pl/agents-specialist-teams)** - 4 zespoły ekspertów domenowych
10. **[Agenci wyspecjalizowani](/pl/agents-specialized)** - 48 wyspecjalizowanych agentów MCP

### **5. Rozwój i użycie**
11. **[Referencja CLI](/pl/cli-reference)** - Wszystkie polecenia CLI i użycie
12. **[Przewodnik rozwoju](/pl/development-guide)** - Jak dodawać funkcje i rozszerzać system
13. **[Docker](/pl/docker)** - Konfiguracja i ustawienia Docker

---

## 🏗️ **Architektura systemu (szybki przegląd)**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SYSTEM BERYBOO AI                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │           WARSTWA WEJŚCIA (Źródła danych)                  │    │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐   │    │
│  │  │Anomalie  │  │  GA4     │  │   GSC   │  │Meta/Ads  │   │    │
│  │  │ Baza     │  │ MCP      │  │  MCP    │  │   MCP    │   │    │
│  │  │ danych   │  │          │  │         │  │          │   │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬────┘  └────┬─────┘   │    │
│  └───────┼─────────────┼─────────────┼────────────┼──────────┘    │
│          │             │             │            │                │
│  ┌───────▼─────────────▼─────────────▼────────────▼──────────┐    │
│  │        WARSTWA PRZETWARZANIA WSTĘPNEGO (Agenci główni)     │    │
│  │  ┌─────────────────┐        ┌──────────────────────┐      │    │
│  │  │ Reaktywny       │        │ Proaktywny          │      │    │
│  │  │ Agent główny    │        │ Agent główny        │      │    │
│  │  │ (oparty na      │        │ (oparty na          │      │    │
│  │  │ anomaliach)    │        │ spostrzeżeniach MCP) │      │    │
│  │  └────────┬────────┘        └──────────┬───────────┘      │    │
│  └───────────┼────────────────────────────┼──────────────────┘    │
│              │                             │                       │
│  ┌───────────▼─────────────────────────────▼──────────────────┐   │
│  │         WARSTWA ROUTINGU (Selector Group Chat)              │   │
│  │  Inteligentne kierowanie do odpowiednich zespołów           │   │
│  │  specjalistów                                               │   │
│  └───────────┬──────────────────────────────────────────────┘   │
│              │                                                    │
│  ┌───────────▼───────────────────────────────────────────────┐   │
│  │        ZESPOŁY SPECJALISTÓW (4-Agentowa konsultacja)    │   │
│  │  ┌────────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐  │   │
│  │  │Marketing   │  │   SEO   │  │   UX    │  │   GSC    │  │   │
│  │  │Performance │  │Specjalista│ │Specjalista│ │Specjalista│  │   │
│  │  └────────────┘  └─────────┘  └─────────┘  └──────────┘  │   │
│  │  Każdy zespół: Schema → Research → Strategy → Validator   │   │
│  └───────────┬──────────────────────────────────────────────┘   │
│              │                                                    │
│  ┌───────────▼───────────────────────────────────────────────┐   │
│  │       WARSTWA WYJŚCIA (Rekomendacje produkcyjne)          │   │
│  │  1. Formatowanie rekomendacji (polski język biznesowy)     │   │
│  │  2. Ostateczny walidator (persystencja bazy danych)        │   │
│  │  3. Wyświetlanie terminala                                │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 **Kluczowe koncepcje**

### **1. Dwutorowy system rekomendacji**

System działa z **dwoma równoległymi pipeline'ami**:

| Aspekt | Pipeline reaktywny | Pipeline proaktywny |
|--------|-------------------|-------------------|
| **Wyzwalacz** | Wykryta anomalia | Codzienna zaplanowana analiza |
| **Źródło** | Tabela `ai_general_anomalies` | Tabela `ai_insights` (48 agentów) |
| **Fokus** | Wykrywanie problemów | Odkrywanie możliwości |
| **Agent** | Reaktywny Agent główny | Proaktywny Agent główny |
| **Częstotliwość** | Czas rzeczywisty / Co godzinę | Codzienna partia |

### **2. Architektura wieloagentowa**

- **Agenci główni**: Przetwarzają wstępnie i kierują zadania
- **Zespoły specjalistów**: 4-agentowe zespoły konsultacyjne (Schema, Research, Strategy, Validator)
- **Agenci wyspecjalizowani**: 48 agentów MCP do zbierania i analizy danych
- **Pipeline produkcyjny**: Formatter → Validator → Baza danych

### **3. Model Context Protocol (MCP)**

- **Serwery MCP** (`mcp_server_*`): Łączą się z zewnętrznymi API (GA4, GSC, Meta Ads, itp.)
- **Narzędzia MCP** (`mcp_tools`): Biblioteka klienta Python dla agentów do wywoływania serwerów
- **Wykonanie kodu**: Agenci piszą kod Python w bezpiecznym sandboxie, aby współdziałać z MCP

### **4. Architektura wielodostępowa**

- Każdy sklep klienta ma izolowane poświadczenia i dane
- Tokeny OAuth przechowywane na sklep w bazie danych
- Bezpieczny sandbox zapewnia brak dostępu do danych między sklepami
- CLI obsługuje parametr `--shop-id` dla każdego klienta

---

## 🛠️ **Szybka konfiguracja**

### **1. Zainstaluj zależności**

```bash
cd backend/src/ai
pip install -r requirements.txt
pip install RestrictedPython  # Dla sandboxu wykonania kodu
```

### **2. Skonfiguruj środowisko**

```bash
cp env_example .env
# Edytuj .env z Twoimi poświadczeniami:
# - OPENAI_API_KEY
# - Poświadczenia bazy danych
# - Domyślne ID sklepu
```

### **3. Przetestuj instalację**

```bash
# Przetestuj połączenie z bazą danych
python test_db_connection.py

# Przetestuj podstawowe CLI
python main.py --help

# Przetestuj z domyślnym sklepem
python main.py chat-ga4
```

---

## 📚 **Słownik dokumentacji**

### **Typowe terminy**

- **Anomalia**: Statystyczne odchylenie wykryte w metrykach (spadek ruchu, skok konwersji, itp.)
- **Sklep**: Sklep e-commerce klienta (jednostka wielodostępowa)
- **Property ID**: Identyfikator właściwości Google Analytics 4
- **Customer ID**: Identyfikator konta Google Ads
- **MCP**: Model Context Protocol - otwarty standard integracji narzędzi AI
- **Workbench**: Implementacja klienta MCP AutoGen
- **Sandbox**: Ograniczone środowisko Python do bezpiecznego wykonania kodu
- **AnomalyPackage**: Format danych strukturalnych dla przetworzonych wstępnie anomalii
- **ProductionRecommendation**: Ostateczna sformatowana rekomendacja dla klientów

### **Typy agentów**

- **Agent główny**: Kieruje i koordynuje zespoły specjalistów
- **Agent Schema**: Ekspert od bazy danych i analizy danych
- **Agent Research**: Wywiadowczość rynkowa i konkurencyjna
- **Agent Strategy**: Taktyczne rekomendacje i hacki wzrostu
- **Agent Validator**: Kontrola jakości i walidacja
- **Agent wyspecjalizowany**: Automatyczny agent zbierania danych MCP

### **Tabele bazy danych**

- `ai_general_anomalies`: Wykryte anomalie
- `ai_insights`: Wyniki analizy agentów MCP
- `ai_recommendations`: Ostateczne rekomendacje produkcyjne
- `Integration`: Poświadczenia OAuth na sklep
- `sources_shop`: Informacje o sklepie klienta

---

## 🔍 **Szybka referencja**

### **Ważne katalogi**

```
backend/src/ai/
├── src/berryboo_ai/           # Główny pakiet AI
│   ├── agents/                # Wszyscy agenci
│   │   ├── tools/             # Narzędzia agentów
│   │   ├── *_team.py          # Zespoły specjalistów
│   │   └── *_specialized_agents.py  # Agenci MCP
│   ├── services/              # Usługi podstawowe
│   │   ├── code_execution_sandbox.py
│   │   ├── mcp_credential_manager.py
│   │   └── oauth_credential_resolver.py
│   ├── database/              # Połączenie z bazą danych
│   └── config/                # Konfiguracja
├── mcp_server_ga4/            # Serwer MCP GA4
├── mcp_server_gsc/            # Serwer MCP GSC
├── mcp_server_meta_ads/       # Serwer MCP Meta Ads
├── mcp_server_google_ads/     # Serwer MCP Google Ads
├── mcp_server_pagespeed/      # Serwer MCP PageSpeed
├── mcp_tools/                 # Opakowania klienta MCP
└── tests/                     # Zestaw testów
```

**Witamy na pokładzie! 🚀**

