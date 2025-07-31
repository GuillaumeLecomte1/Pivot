export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Désactiver toutes les règles strictes pour permettre les gitmojis
        'type-empty': [0],
        'subject-empty': [0],
        'header-max-length': [2, 'always', 120]
    },
    ignores: [
        // Ignorer les messages qui commencent par un gitmoji
        (message) => /^(?:\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(message)
    ]
};