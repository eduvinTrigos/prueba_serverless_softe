const { db, DataTypes } = require("../database/mysql.connect");

const personaje_model = db.define('personaje', {
    per_id: {
        type: DataTypes.INTEGER, // Corregido el tipo de dato a INTEGER
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    per_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '0',
        collate: 'utf8mb4_spanish2_ci'
    },
    per_last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '0',
        collate: 'utf8mb4_spanish2_ci'
    },
    per_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
        min: 0
        }
    },
    per_gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '0',
        collate: 'utf8mb4_spanish2_ci'
    },
    per_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        collate: 'utf8mb4_spanish2_ci'
    },
    per_skills: {
        type: DataTypes.TEXT,
        allowNull: false,
        collate: 'utf8mb4_spanish2_ci'
    },
    per_date_create: {
        type: DataTypes.DATE,
        allowNull: false
    },
    per_date_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    per_status: {
        type: DataTypes.BIGINT(19),
        allowNull: false,
        defaultValue: 0
    }
}, {
  tableName: 'personaje',
  timestamps: false // Si la tabla tiene columnas createdAt y updatedAt, puedes cambiarlo a true
});

module.exports = personaje_model;