"use server"
import { execSync, spawn } from "child_process";
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



async function formatPython(code: string): Promise<string> {
  return new Promise((res, rej) => {
    const blackProcess = spawn('black', ['--code', code, '--quiet']);
    let formattedCode = '';
    let errorOutput = '';

    blackProcess.stdout.on('data', (data) => {
      formattedCode += data.toString();
    });

    blackProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    blackProcess.on('close', (exitCode) => {
      if (exitCode === 0) {
        res(formattedCode.trim())
      } else {
        console.log(`Black formatting failed: ${errorOutput}`);
        res(code)
      }
    });
  })
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

