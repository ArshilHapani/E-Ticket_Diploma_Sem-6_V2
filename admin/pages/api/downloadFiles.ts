//@ts-nocheck

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  const { filename } = req.query;
  const filePath = `/assets/${filename}`;
  const fileBuffer = await fs.promises.readFile(filePath);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Length", fileBuffer.length);
  res.send(fileBuffer);
}
