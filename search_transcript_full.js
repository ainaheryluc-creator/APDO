const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\no-enter\\.gemini\\antigravity\\brain\\09935bfa-dc5d-4a08-82d5-6d69f7e7711d\\.system_generated\\logs\\transcript.jsonl';

async function main() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    // Let's search for "password" or "mot de passe" or "admin" or "signup" or "register" or "signIn"
    const lower = line.toLowerCase();
    if (lower.includes('admin') || lower.includes('pass') || lower.includes('signup') || lower.includes('register') || lower.includes('createuser') || lower.includes('sign_up')) {
      if (lineCount < 200) {
        console.log(`L${lineCount}: ${line.substring(0, 300)}...`);
      }
    }
  }
}

main();
