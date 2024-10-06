@echo off

IF "%1"=="" (
   echo kea-config.bat [OPTIONS]
   echo Options:
   echo     [--prefix]
   echo     [--version]
   echo     [--libs]
   echo     [--cflags]
   echo     [--includes]
   EXIT /B 1
) ELSE (
:printValue
    if "%1" neq "" (
	    IF "%1"=="--prefix" echo N:/Cientificos Geoespaciales/cientificos-geoespaciales/backend/speculapp/Library
	    IF "%1"=="--version" echo 1.5.0
	    IF "%1"=="--cflags" echo -IN:/Cientificos Geoespaciales/cientificos-geoespaciales/backend/speculapp/Library/include
	    IF "%1"=="--libs" echo -LIBPATH:N:/Cientificos Geoespaciales/cientificos-geoespaciales/backend/speculapp/Library/lib libkea.lib 
	    IF "%1"=="--includes" echo N:/Cientificos Geoespaciales/cientificos-geoespaciales/backend/speculapp/Library/include
		shift
		goto :printValue
    )
	EXIT /B 0
)
