/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/construction-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleConstructionAiCompliance } from "./tools/construction-ai-compliance.js";

const server = new McpServer({
  name: "csoai-construction-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const ConstructionAiComplianceShape = {
  system_name: z.string().describe("Name of construction AI system"),
  ai_function: z.string().describe("Function (safety monitoring, BIM optimization, autonomous equipment, quality inspection, project scheduling)"),
  safety_criticality: z.string().describe("Safety level (life-safety, structural, environmental, financial, operational)"),
  deployment_type: z.string().describe("Deployment (on-site edge, cloud, drone-based, wearable, autonomous)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US/OSHA, UK/HSE, etc.)"),
};

// ─── Tool 1: construction_ai_compliance ───
(server.tool as any)(
  "construction_ai_compliance",
  "Assess regulatory compliance for AI in construction. Covers safety monitoring, autonomous equipment, structural integrity, and workforce management.",
  ConstructionAiComplianceShape,
  async (args: any) => {
    const result = handleConstructionAiCompliance(args.system_name, args.ai_function, args.safety_criticality, args.deployment_type, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
