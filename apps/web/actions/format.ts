"use server"
import { execSync } from "child_process";
import prettier from "prettier";

enum Language {
  C = "C",
  CPP = "CPP",
  JS = "JS",
  PYTHON = "PYTHON"
}

const formatCpp = async (code: string) => {
  const formatted = execSync(
    `clang-format -style="{BasedOnStyle: llvm, IndentWidth: 4, BraceWrapping: {AfterFunction: true, AfterClass: true}}"`,
    { input: code, encoding: "utf-8" }
  );
  return formatted;
}

const formatJs = (code: string) => {
  return prettier.format(code, {
    parser: "babel", // or "typescript" if TS
    semi: true,
    singleQuote: true,
    trailingComma: "es5",
    tabWidth: 2,
  });
};



async function formatPython(code: string) {
  const lines = code.split("\n");

  let formatted: string[] = [];
  let indentLevel = 0;
  const indent = "    "; // 4 spaces per indent

  for (let rawLine of lines) {
    let line = rawLine.trim();

    // Skip empty lines, but keep one blank line max
    if (line === "") {
      if (formatted.length > 0 && formatted[formatted.length - 1] !== "") {
        formatted.push("");
      }
      continue;
    }

    // Dedent when line starts with 'return', 'pass', 'break', etc.
    if (/^(return|pass|break|continue)/.test(line)) {
      indentLevel = Math.max(indentLevel, 0);
    }

    // Add spacing around operators (=, +, -, :)
    line = line.replace(/\s*=\s*/g, " = ");
    line = line.replace(/\s*:\s*/g, ": ");
    line = line.replace(/\s*\+\s*/g, " + ");
    line = line.replace(/\s*-\s*/g, " - ");
    line = line.replace(/\s*\/\s*/g, " / ");
    line = line.replace(/\s*\*\s*/g, " * ");

    // Format function definitions
    if (line.startsWith("def ")) {
      line = line.replace(/\)\s*:/, "):");
    }

    // Apply indentation
    formatted.push(indent.repeat(indentLevel) + line);

    // Increase indent after block openers (if, for, while, def, class, try, except)
    if (/(def |class |if |for |while |try:|except |else:|elif )/.test(line) && line.endsWith(":")) {
      indentLevel++;
    }

    // Dedent on 'return', 'pass', etc. next line automatically handled
    if (/^(return|pass|break|continue)/.test(line)) {
      // no auto-dedent, Python syntax handles it — but you could add custom rules
    }
  }

  return formatted
    .map((line) => {
      if (line.startsWith("def") || line.startsWith("class")) return line;
      if (line === "") return "";
      return "    " + line;
    })
    .join("\n");
}

export const format = async (code: string, language: Language) => {
  let formatted = code
  switch (language) {
    case Language.CPP:
      formatted = await formatCpp(code)
      break
    case Language.C:
      formatted = await formatCpp(code)
      break
    case Language.JS:
      formatted = await formatJs(code)
      break
    case Language.PYTHON:
      formatted = await formatPython(code)
  }

  return formatted
}

