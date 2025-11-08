# React TS Migration Utils

A small set of high-impact utilities to solve the most painful parts of migrating a legacy React + JavaScript codebase to TypeScript.

[![NPM version](https://img.shields.io/npm/v/react-ts-migration-utils.svg)](https://www.npmjs.com/package/react-ts-migration-utils)

## The Problem

When migrating a React JS app to TypeScript, you hit the same annoying problems:
1.  How do I convert all my `PropTypes` to `interface` or `type` definitions?
2.  How do I type `React.createContext` without making every consumer check for `null`?

This library provides small helpers to solve these problems instantly.

## Installation

```bash
npm install react-ts-migration-utils