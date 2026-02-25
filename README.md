# 🍴 OrderingSystemMenza (UTB.Minute)

> Moderní systém pro správu a objednávání stravy v menze postavený na nejnovějších technologiích ekosystému **.NET**.

![.NET 10](https://img.shields.io/badge/.NET-10-512bd4?style=for-the-badge&logo=dotnet)
![Aspire](https://img.shields.io/badge/Aspire-Integrated-blue?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Clean-green?style=for-the-badge)

---

## 🚀 Klíčové vlastnosti a technologie

* **Cloud-Native Foundation:** Plná integrace s **.NET Aspire** pro orchestraci služeb.
* **Real-time notifikace:** Využití **Server-Sent Events (SSE)** pro okamžité aktualizace stavu objednávek pro studenty i kuchaře.
* **Bezpečnost:** Robustní autentizace a autorizace pomocí **Keycloak Identity**.
* **Moderní API:** Postaveno na **Minimal Web API** s využitím `TypedResults` pro silnou typovou kontrolu.
* **Service Discovery:** Dynamické propojování služeb bez pevně zadaných IP adres.
* **Data Integrity:** Entity Framework Core s jasným oddělením **DTO** (Data Transfer Objects).

---

## 🏗️ Architektura systému

Projekt je rozdělen do logických vrstev zajišťujících čistotu kódu a znovupoužitelnost komponent.



### Přehled projektů v Solution

| Projekt | Funkce a popis |
| :--- | :--- |
| **UTB.Minute.AppHost** | Centrální Aspire orchestrátor, konfigurace databáze a Keycloaku. |
| **UTB.Minute.WebAPI** | Jádro systému. Obsahuje endpointy a SSE notifikace. Reference: `Db`, `Contracts`. |
| **UTB.Minute.Contracts** | Sdílené **DTO**. Jediné místo pravdy pro datové struktury. |
| **UTB.Minute.Db** | Databázová vrstva, entity a **Entity Framework** DbContext. |
| **UTB.Minute.DbManager** | Nástroj pro správu (Reset, Seed testovacích dat přes HTTP Command). |
| **UTB.Minute.AdminClient** | Blazor Server aplikace pro administrativu menzy. |
| **UTB.Minute.CanteenClient** | Rozhraní pro studenty a kuchařky (Blazor Server). |
| **UTB.Minute.WebAPI.Tests** | Integrační testy běžící proti reálné databázi (např. SQL Server). |

---

## 🛠️ Technické požadavky a pravidla

Pro úspěšné odevzdání a funkčnost musí projekt splňovat:

1.  **Runtime:** Výhradně `.NET 10`.
2.  **Jazyk:** Veškerý zdrojový kód (názvy proměnných, tříd, komentáře) musí být v **angličtině**.
3.  **Komunikace:** Klienti komunikují výhradně přes **HTTP protokol** (nikdy přímo s DB).
4.  **DRY Princip:** DTO jsou definována pouze v projektu `Contracts`.
5.  **Clean Code:** Použití `TypedResults` v Minimal API a nezávislost DTO na entitách.

---

## ✅ Checklist před odevzdáním

> [!CAUTION]
> **Důležité pravidlo:** Pokud se projekt nesestaví, nespustí nebo nebude splňovat verzi .NET 10 / angličtinu, je hodnocen **0 body** bez ohledu na implementaci.

### Funkcionalita
- [ ] Funkční Service Discovery (žádné hardcoded IP adresy).
- [ ] Implementován HTTP Command pro reset a seed databáze.
- [ ] SSE notifikace jsou doručovány studentům i kuchařkám.
- [ ] Keycloak správně chrání přístup k aplikacím.
- [ ] Entity Framework migrace fungují korektně.

### Architektura
- [ ] Minimal API používá `TypedResults`.
- [ ] DTO jsou striktně oddělena od databázových entit.
- [ ] Klienti přistupují k datům pouze přes API.

---

## 🏁 Jak začít

1.  Ujistěte se, že máte nainstalované **.NET 10 SDK** a **Docker Desktop** (pro kontejnery v Aspire).
2.  Klonujte repozitář: `git clone https://github.com/Mofrus/OrderingSystemMenza.git`
3.  Otevřete solution `OrderingSystemMenza.sln`.
4.  Nastavte projekt **UTB.Minute.AppHost** jako startovací projekt.
5.  Spusťte aplikaci (F5) – Aspire Dashboard se postará o zbytek.

---
*Vytvořeno jako semestrální projekt pro UTB Zlín.*
