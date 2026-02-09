# OrderingSystemMenza

# Požadavky na řešení

    .NET 10
    Jazyk použitý ve zdrojovém kódu bude angličtina.
    Projekt využívá .NET Aspire:
        Vytváří databázi (např. SQL Server).
        Používá Identity nástroj Keycloak k zabezpečení aplikace.
        Využívá Service Discovery, bez pevně zadaných IP adres.
        Obsahuje Http Command pro reset databáze (smazání, vytvoření, seed testovacích dat).
    Projekt používá Entity framework pro práci s databází.
    Projekt používá Minimal Web API s TypedResults.
    Projekt používá DTO (Data Transfer Objects) nezávislé na entitách.
    Kód se neopakuje (DTO jsou definována pouze na jednom místě).
    Projekt využívá Server-Sent Events (SSE) pro serverem iniciované notifikace o změnách v objednávkách pro studenta a kuchařku.
    Klientské aplikace volají Minimal Web API pomocí Http protokolu a nepřistupují přímo k databázi a entitám.

## Architektura
# Základní struktura řešení

    UTB.Minute.AppHost - Aspire Integrace.
    UTB.Minute.Db – entity a DbContext.
    UTB.Minute.DbManager – WebAPI pro Http Command, reset a seed databáze (reference na UTB.Minute.Db).
    UTB.Minute.Contracts – DTO (Data Transfer Objects).
    UTB.Minute.WebAPI – společné WebAPI pro všechny klienty včetně Server-Sent Events (SSE) notifikací (reference na UTB.Minute.Db a UTB.Minute.Contracts).
    UTB.Minute.WebAPI.Tests - test WebAPI využívající použitou databázi, například SQL Server (reference na UTB.Minute.WebAPI).
    UTB.Minute.AdminClient – Blazor Server aplikace pro vedení menzy (reference na UTB.Minute.Contracts). Volá WebAPI pomocí protokolu Http.
    UTB.Minute.CanteenClient – Blazor Server aplikace pro zjednodušení pro studenty a kuchařky (nutno zabezpečit přístup). Pro kuchařky a studenty je možné i vytvořit nezávislé projekty (reference na UTB.Minute.Contracts). Volá WebAPI pomocí protokolu Http.
# Objednávací systém v menze – checklist a hodnocení

Tento checklist slouží:

    studentům jako kontrolní seznam před odevzdáním
    vyučujícím jako jednotná hodnoticí kritéria

⚠️ Důležité pravidlo
Pokud se projekt nesestaví nebo nespustí a nebude v angličtině nebo v .NET 10, hodnotí se odevzdání 0 body
(bez ohledu na částečnou implementaci funkcionality).
