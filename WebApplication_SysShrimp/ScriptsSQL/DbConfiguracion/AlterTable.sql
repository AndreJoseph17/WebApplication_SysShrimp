
USE SysShrimp

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'cajas_entrantas' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD cajas_entrantas decimal (18,2)
END

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'cajas_salientes' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD cajas_salientes decimal (18,2)
END

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'peso_entrante' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD peso_entrante decimal (18,2)
END

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'peso_saliente' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD peso_saliente decimal (18,2)
END

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'temp_minima' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD temp_minima decimal (18,2) null
END

IF not exists
		(SELECT *
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE COLUMN_NAME = 'temp_maxima' AND TABLE_NAME = 'tb_bitacora_tunel')
BEGIN
  ALTER TABLE tb_bitacora_tunel
	ADD temp_maxima decimal (18,2) null
END